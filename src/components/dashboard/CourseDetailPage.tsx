"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Check,
  Award,
  Lock,
  BookOpen,
  HelpCircle,
  AlertCircle,
  XCircle,
  CheckCircle,
  RotateCcw,
  Clock,
} from "lucide-react";
import { useCourseStore } from "@/features/courses/course.store";
import { QuizAnswer } from "@/features/courses/course.types";
import { getS3Url } from "@/features/courses/course.helper";

const VideoPlayer = dynamic(() => import("@/components/training/VideoPlayer"), {
  ssr: false,
});

type QuizPhase = "idle" | "in_progress" | "result";

interface QuizState {
  phase: QuizPhase;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  timeLeft: number;
  result: {
    score: number;
    passed: boolean;
    passingScore: number;
    correctCount: number;
    totalQuestions: number;
  } | null;
}

export default function CourseDetailPage({
  courseId,
  moduleId,
}: {
  courseId: string;
  moduleId: string;
}) {
  const router = useRouter();
  const {
    currentCourse,
    playlist,
    certificateUnlock,
    courseDetailLoading: loading,
    error,
    fetchCourseById,
    submitVideoWatched,
    submitQuiz,
    quizSubmitting,
  } = useCourseStore();

  const [isClient, setIsClient] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [lastWatchedTime, setLastWatchedTime] = useState(0);

  const [quizState, setQuizState] = useState<QuizState>({
    phase: "idle",
    currentQuestionIndex: 0,
    answers: [],
    timeLeft: 0,
    result: null,
  });

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (duration: number) => {
      clearTimer();
      setQuizState((prev) => ({ ...prev, timeLeft: duration }));
      timerRef.current = setInterval(() => {
        setQuizState((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    },
    [clearTimer],
  );

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const goToNextLesson = useCallback(() => {
    const freshPlaylist = useCourseStore.getState().playlist;
    const currentIndex = freshPlaylist.findIndex((p) => p.id === courseId);
    const nextIndex = currentIndex + 1;

    if (nextIndex < freshPlaylist.length) {
      const nextItem = freshPlaylist[nextIndex];
      router.push(`/modules/${moduleId}/my-courses/${nextItem.id}`);
    }
  }, [courseId, moduleId, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (courseId) fetchCourseById(courseId);
  }, [courseId, fetchCourseById]);

  useEffect(() => {
    clearTimer();
    setQuizState({
      phase: "idle",
      currentQuestionIndex: 0,
      answers: [],
      timeLeft: 0,
      result: null,
    });
    setSelectedOptionIndex(null);
  }, [courseId, clearTimer]);

  useEffect(() => {
    if (!playlist.length || !courseId) return;
    const idx = playlist.findIndex((p) => p.id === courseId);
    setActiveLessonIndex(idx !== -1 ? idx : 0);
  }, [courseId, playlist]);

  useEffect(() => {
    if (quizState.phase !== "in_progress" || !currentCourse?.questions?.length)
      return;
    const q = currentCourse.questions[quizState.currentQuestionIndex];
    if (q) startTimer(q.questionDuration ?? 30);
    return () => clearTimer();
  }, [
    quizState.phase,
    quizState.currentQuestionIndex,
    currentCourse,
    startTimer,
    clearTimer,
  ]);

  useEffect(() => {
    if (quizState.phase !== "in_progress" || quizState.timeLeft !== 0) return;
    handleNextQuestion();
  }, [quizState.timeLeft]);

  const startQuiz = () => {
    if (!currentCourse?.questions?.length) return;
    setSelectedOptionIndex(null);
    setQuizState({
      phase: "in_progress",
      currentQuestionIndex: 0,
      answers: [],
      timeLeft: currentCourse.questions[0].questionDuration ?? 30,
      result: null,
    });
  };

  const handleNextQuestion = async () => {
    if (!currentCourse?.questions) return;

    const q = currentCourse.questions[quizState.currentQuestionIndex];
    const newAnswers: QuizAnswer[] = [
      ...quizState.answers,
      ...(selectedOptionIndex !== null
        ? [{ questionId: q.id, selectedOptionIndex }]
        : []),
    ];

    const isLast =
      quizState.currentQuestionIndex >= currentCourse.questions.length - 1;

    if (isLast) {
      clearTimer();
      const result = await submitQuiz({ courseId, answers: newAnswers });
      await fetchCourseById(courseId);
      setQuizState((prev) => ({
        ...prev,
        phase: "result",
        answers: newAnswers,
        result: result
          ? {
              score: result.score,
              passed: result.passed,
              passingScore: currentCourse.passingScore,
              correctCount: result.correctCount,
              totalQuestions: result.totalQuestions,
            }
          : null,
      }));
      setSelectedOptionIndex(null);
    } else {
      clearTimer();
      setSelectedOptionIndex(null);
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: newAnswers,
      }));
    }
  };

  const handleRetakeQuiz = () => {
    if (!currentCourse?.questions?.length) return;
    setSelectedOptionIndex(null);
    setQuizState({
      phase: "in_progress",
      currentQuestionIndex: 0,
      answers: [],
      timeLeft: currentCourse.questions[0].questionDuration ?? 30,
      result: null,
    });
  };

  const handleVideoEnded = async () => {
    if (!courseId) return;
    try {
      await submitVideoWatched(courseId);
      await fetchCourseById(courseId);
    } catch (err) {
      console.error("Watch logger failed:", err);
    }

    const freshCourse = useCourseStore.getState().currentCourse;

    if (freshCourse?.progress?.quizPassed) {
      goToNextLesson();
      return;
    }

    startQuiz();
  };

  const handleProgressUpdate = (seconds: number) => setLastWatchedTime(seconds);

  const handleBackNavigation = () => {
    const targetPath = `/modules/${moduleId}/my-courses`;
    try {
      router.push(targetPath);
    } catch {
      window.location.href = targetPath;
    }
  };

  if (!isClient || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
        <p className="text-sm font-bold text-slate-400 italic animate-pulse">
          Syncing media playlist structural layouts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto mt-12 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-red-800 text-sm">
            Failed to retrieve course files
          </h3>
          <p className="text-xs text-red-600 mt-1">{error}</p>
          <Link
            href="/my-courses"
            className="inline-block mt-4 text-xs font-bold text-purple-700 underline"
          >
            Go back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!currentCourse) return null;

  const activePlaylistItem = playlist[activeLessonIndex];
  const rawVideoUrl = activePlaylistItem?.vedioUrl ?? currentCourse.videoUrl;
  const activeVideoUrl = getS3Url(rawVideoUrl);

  const questions = currentCourse.questions ?? [];
  const currentQ = questions[quizState.currentQuestionIndex];
  const totalQ = questions.length;
  const qNum = quizState.currentQuestionIndex + 1;
  const timerPct = currentQ
    ? (quizState.timeLeft / (currentQ.questionDuration ?? 30)) * 100
    : 0;

  const renderQuizOverlay = () => {
    if (quizState.phase === "idle") return null;

    if (quizState.phase === "result") {
      const r = quizState.result;
      const passed = r?.passed ?? false;
      return (
        <div className="absolute inset-0 bg-[#1E1B4B]/95 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-[32px] shadow-2xl flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {passed ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
            </div>

            <span
              className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                passed ? "text-green-600" : "text-red-500"
              }`}
            >
              {passed ? "Quiz Passed" : "Quiz Failed"}
            </span>

            <h2 className="text-2xl font-black text-slate-800 mb-1">
              {r?.score ?? 0}%
            </h2>
            <p className="text-xs text-slate-400 font-bold mb-6">
              {r?.correctCount ?? 0} out of {r?.totalQuestions ?? totalQ}{" "}
              correct &nbsp;·&nbsp; Passing score:{" "}
              {r?.passingScore ?? currentCourse.passingScore}%
            </p>

            <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
              <div
                className={`h-2 rounded-full transition-all ${passed ? "bg-green-500" : "bg-red-400"}`}
                style={{ width: `${r?.score ?? 0}%` }}
              />
            </div>

            {!passed && (
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                You need{" "}
                <span className="font-bold text-slate-700">
                  {r?.passingScore ?? currentCourse.passingScore}%
                </span>{" "}
                to pass. Review the material and try again.
              </p>
            )}

            <div className="flex gap-3 w-full">
              {!passed && (
                <button
                  onClick={handleRetakeQuiz}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
              )}
              <button
                onClick={() => {
                  setQuizState((p) => ({ ...p, phase: "idle" }));
                  if (passed) goToNextLesson();
                }}
                className="flex-1 py-3 rounded-xl bg-[#1E1B4B] text-white text-xs font-bold hover:bg-[#2d2a6e] transition"
              >
                {passed ? "Continue" : "Review Material"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!currentQ) return null;

    return (
      <div className="absolute inset-0 bg-[#1E1B4B]/95 flex items-center justify-center p-6 z-50">
        <div className="bg-white w-full max-w-xl p-8 rounded-[32px] shadow-2xl">
          {/* header row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#EFF2FF] rounded-xl text-[#822C89]">
                <HelpCircle size={16} />
              </div>
              <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                Question {qNum}/{totalQ}
              </span>
            </div>

            <div
              className={`flex items-center gap-1.5 text-xs font-black tabular-nums ${
                quizState.timeLeft <= 10 ? "text-red-500" : "text-slate-500"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Time remaining: {formatTime(quizState.timeLeft)}
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${
                quizState.timeLeft <= 10 ? "bg-red-400" : "bg-[#822C89]"
              }`}
              style={{ width: `${timerPct}%` }}
            />
          </div>

          <p className="text-sm font-bold text-slate-800 mb-5 leading-relaxed">
            {currentQ.questionText}
          </p>

          <div className="space-y-2">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOptionIndex(idx)}
                className={`w-full p-3.5 text-left rounded-xl border text-xs font-medium transition-all ${
                  selectedOptionIndex === idx
                    ? "border-[#822C89] bg-[#EFF2FF] text-[#1E1B4B] font-bold"
                    : "border-slate-100 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <span className="inline-block mr-2 text-purple-500 font-bold">
                  {option.label}.
                </span>
                {option.text}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < quizState.currentQuestionIndex
                      ? "bg-[#822C89]"
                      : i === quizState.currentQuestionIndex
                        ? "bg-[#822C89] scale-125"
                        : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <button
              disabled={selectedOptionIndex === null || quizSubmitting}
              onClick={handleNextQuestion}
              className="bg-[#1E1B4B] text-white text-xs px-6 py-2.5 rounded-xl font-bold disabled:opacity-40 shadow-sm flex items-center gap-2 transition"
            >
              {quizSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : qNum === totalQ ? (
                "Submit Quiz"
              ) : (
                "Next Question"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto bg-[#F8FAFC] relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackNavigation}
            className="p-2 hover:bg-white rounded-full transition bg-white shadow-sm border border-slate-200 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight uppercase italic">
              {currentCourse.title}
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Passing criteria target score: {currentCourse.passingScore}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-6">
          <div className="aspect-video rounded-[32px] overflow-hidden border-[6px] border-white shadow-xl relative">
            {activeVideoUrl && (
              <VideoPlayer
                videoUrl={activeVideoUrl}
                lastSavedTime={lastWatchedTime}
                onProgressUpdate={handleProgressUpdate}
                onVideoEnd={handleVideoEnded}
              />
            )}
            {renderQuizOverlay()}
          </div>

          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3 text-[#822C89]">
              <BookOpen className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">
                Module Breakdown
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2 italic">
              About this learning structure
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {currentCourse.description ||
                "No specific brief metadata logs supplied for this dynamic record course reference module."}
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-sm mb-4 px-1 italic uppercase text-slate-700">
              Course Index Playlist
            </h3>

            <div className="space-y-2">
              {playlist.length === 0 ? (
                <div className="p-4 rounded-[20px] bg-slate-50 border border-dashed text-center text-xs text-gray-400">
                  Single core runtime asset available.
                </div>
              ) : (
                playlist.map((item, index) => {
                  const isActive = activeLessonIndex === index;
                  const isUnlocked =
                    index === 0 || playlist[index - 1].isPassed;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (!isUnlocked) return;
                        if (item.id === courseId) {
                          setActiveLessonIndex(index);
                        } else {
                          router.push(
                            `/modules/${moduleId}/my-courses/${item.id}`,
                          );
                        }
                      }}
                      className={`p-3.5 rounded-[20px] flex items-center gap-3.5 transition-all
                        ${isActive ? "ring-2 ring-purple-500 bg-purple-50/60" : ""}
                        ${!isUnlocked ? "opacity-40 cursor-not-allowed bg-slate-50" : "cursor-pointer hover:bg-slate-50"}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white
                        ${item.isPassed ? "bg-purple-600" : "bg-slate-200"}`}
                      >
                        {item.isPassed ? (
                          <Check className="w-4 h-4" />
                        ) : !isUnlocked ? (
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          className={`text-xs font-bold truncate ${isActive ? "text-purple-700" : "text-slate-700"}`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                          {item.duration || "N/A"}{" "}
                          {item.isPassed && "• Evaluated"}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            className={`p-6 rounded-[32px] transition-all duration-500 
            ${
              certificateUnlock?.isEligible
                ? "bg-gradient-to-br from-[#2C3979] to-indigo-900 text-white shadow-md"
                : "bg-slate-100 border border-slate-200/60 text-slate-400"
            }`}
          >
            <Award
              className={`w-10 h-10 mb-3 ${certificateUnlock?.isEligible ? "text-yellow-400" : "text-slate-300"}`}
            />
            <h3 className="font-bold text-md mb-1 italic uppercase">
              Training Certificate
            </h3>
            <p className="text-[11px] font-medium leading-snug mb-4">
              {certificateUnlock?.isEligible
                ? "Congratulations! Your account credentials satisfy validation logs."
                : "Complete all core target courses to unlock official certificate verification."}
            </p>

            <button
              disabled={!certificateUnlock?.isEligible}
              onClick={() => {
                if (certificateUnlock?.certificateUrl) {
                  window.open(
                    getS3Url(certificateUnlock.certificateUrl),
                    "_blank",
                  );
                }
              }}
              className={`w-full py-3.5 rounded-[16px] text-xs font-black italic uppercase transition-all shadow-sm
                ${
                  certificateUnlock?.isEligible
                    ? "bg-white text-purple-900 hover:bg-slate-50 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              {certificateUnlock?.isEligible
                ? "Download Certificate"
                : "Asset Locked"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
