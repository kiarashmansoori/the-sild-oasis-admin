import { NextResponse } from "next/server";
export function returnFunction(success, message, status) {
  return NextResponse.json(
    {
      success: success,
      message: message,
    },
    { status: status },
  );
}
