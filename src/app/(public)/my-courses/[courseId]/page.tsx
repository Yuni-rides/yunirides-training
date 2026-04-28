import CourseDetailPage from "@/components/dashboard/CourseDetailPage";

// 1. Function ko 'async' banayein
export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  
  // 2. 'use' ki jagah 'await' use karein (Server Component rules)
  // Hum dynamic params ko yahan resolve kar rahe hain
  return (
    <CourseDetailPageWrapper params={params} />
  );
}

// Ek chota wrapper function taake async/await sahi se handle ho
async function CourseDetailPageWrapper({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  return <CourseDetailPage courseId={resolvedParams.courseId} />;
}