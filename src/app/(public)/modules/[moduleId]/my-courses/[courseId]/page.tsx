import CourseDetailPage from "@/components/dashboard/CourseDetailPage";

export default function Page({
  params,
}: {
  params: Promise<{ moduleId: string; courseId: string }>;
}) {
  return <CourseDetailPageWrapper params={params} />;
}

async function CourseDetailPageWrapper({
  params,
}: {
  params: Promise<{ moduleId: string; courseId: string }>;
}) {
  const resolvedParams = await params;
  return (
    <CourseDetailPage
      courseId={resolvedParams.courseId}
      moduleId={resolvedParams.moduleId}
    />
  );
}
