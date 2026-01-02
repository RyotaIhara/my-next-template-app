// app/api/sample/route.ts
import { NextResponse } from "next/server";
import { SampleUseCaseFactory } from "@/application/factory/SampleUseCaseFactory";

// GET /api/sample
export async function GET() {
  try {
    const getSamplesUseCase = SampleUseCaseFactory.createGetSamplesUseCase();
    const samples = await getSamplesUseCase.execute();

    return NextResponse.json(samples);
  } catch (error) {
    console.error("get samples error", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

// POST /api/sample
export async function POST(req: Request) {
  try {
    const { name, memo } = await req.json();

    if (!name || !memo) {
      return NextResponse.json(
        { error: "名前とメモは必須です" },
        { status: 400 }
      );
    }

    const createSampleUseCase = SampleUseCaseFactory.createCreateSampleUseCase();
    const sample = await createSampleUseCase.execute(name, memo);

    return NextResponse.json(sample, { status: 201 });
  } catch (error) {
    console.error("create sample error", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
