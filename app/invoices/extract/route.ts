import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No invoice file provided." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,

      invoice: {
        supplier: "Fin and Flounder",
        invoiceNumber: "",
        invoiceDate: "",
        subtotal: null,
        vat: null,
        total: null,
        lineItems: [],
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to process invoice." },
      { status: 500 }
    );
  }
}