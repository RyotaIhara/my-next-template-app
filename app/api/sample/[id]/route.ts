// app/api/sample/[id]/route.ts
import { NextResponse } from "next/server";
import { SampleUseCaseFactory } from "@/application/factory/SampleUseCaseFactory";

// GET /api/sample/[id]
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sampleId = parseInt(id, 10);

    if (isNaN(sampleId)) {
      return NextResponse.json(
        { error: "無効なIDです" },
        { status: 400 }
      );
    }

    const getSampleByIdUseCase = SampleUseCaseFactory.createGetSampleByIdUseCase();
    const sample = await getSampleByIdUseCase.execute(sampleId);

    if (!sample) {
      return NextResponse.json(
        { error: "サンプルが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(sample);
  } catch (error) {
    console.error("get sample error", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

// PUT /api/sample/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sampleId = parseInt(id, 10);

    if (isNaN(sampleId)) {
      return NextResponse.json(
        { error: "無効なIDです" },
        { status: 400 }
      );
    }

    const { name, memo } = await req.json();

    if (!name || !memo) {
      return NextResponse.json(
        { error: "名前とメモは必須です" },
        { status: 400 }
      );
    }

    const updateSampleUseCase = SampleUseCaseFactory.createUpdateSampleUseCase();
    const sample = await updateSampleUseCase.execute(sampleId, name, memo);

    return NextResponse.json(sample);
  } catch (error) {
    console.error("update sample error", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

// DELETE /api/sample/[id]
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sampleId = parseInt(id, 10);

    if (isNaN(sampleId)) {
      return NextResponse.json(
        { error: "無効なIDです" },
        { status: 400 }
      );
    }

    const deleteSampleUseCase = SampleUseCaseFactory.createDeleteSampleUseCase();
    await deleteSampleUseCase.execute(sampleId);

    return NextResponse.json({ message: "削除しました" }, { status: 200 });
  } catch (error) {
    console.error("delete sample error", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

