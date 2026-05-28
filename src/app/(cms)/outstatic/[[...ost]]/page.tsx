import "outstatic/outstatic.css";
import { Outstatic } from "outstatic";
import { OstClientWrapper } from "./client-wrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ ost?: string[] }>;
}) {
  const ostData = await Outstatic();
  const { ost = [] } = await params;
  return <OstClientWrapper ostData={ostData} ost={ost} />;
}
