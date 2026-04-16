import CourseDetailPage from "@/components/dashboard/CourseDetailPage";

export default function Page({ params }: { params: { courseId: string } }) {
  // In a real app, you'd fetch course data using params.courseId
  return <CourseDetailPage courseId={params.courseId} />;
}