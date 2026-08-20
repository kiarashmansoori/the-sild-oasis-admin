import cabins from "@/models/cabinsModal";
import connectDb from "@/services/connectDb";

export async function DELETE(rq, { params }) {
  const { id } = await params;
  await connectDb();
  await cabins.findByIdAndDelete(id);
  return Response.json({ maessage: "delete succces" });
}
