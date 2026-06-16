import CourseDetailPage from "@/components/dashboard/CourseDetailPage";

export default function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  return <CourseDetailPageWrapper params={params} />;
}

async function CourseDetailPageWrapper({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = await params;
  return <CourseDetailPage courseId={resolvedParams.courseId} />;
}
