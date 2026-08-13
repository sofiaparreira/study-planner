export async function generatePlannerService(id: string) {
  const response = await fetch(`/api/planner/${id}`, {
    method: "POST",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}