import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { BuildCtx } from "@quartz-community/types";
import { CNAME } from "../src/index";

describe("CNAME", () => {
  let out: string;
  beforeEach(async () => {
    out = await fs.mkdtemp(path.join(os.tmpdir(), "cname-"));
  });
  afterEach(async () => {
    vi.restoreAllMocks();
    await fs.rm(out, { recursive: true, force: true });
  });

  const emit = (baseUrl?: string) =>
    CNAME().emit(
      { argv: { output: out }, cfg: { configuration: { baseUrl } } } as unknown as BuildCtx,
      [],
      { css: [], js: [], additionalHead: [] },
    ) as Promise<string[]>;

  it.each([
    ["example.com", "example.com"],
    ["notes.example.com/garden", "notes.example.com"],
    ["Example.COM:8080/sub/path", "example.com"],
  ])("writes the bare host of baseUrl %s to CNAME", async (baseUrl, host) => {
    const files = await emit(baseUrl);
    expect(files).toEqual([path.join(out, "CNAME")]);
    expect(await fs.readFile(path.join(out, "CNAME"), "utf8")).toBe(host);
  });

  it("warns and writes nothing without a baseUrl", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await emit(undefined)).toEqual([]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("baseUrl"));
    await expect(fs.readdir(out)).resolves.toEqual([]);
  });

  it("emits nothing on partial (incremental) rebuilds", async () => {
    const results = [];
    for await (const file of CNAME().partialEmit!(
      {} as BuildCtx,
      [],
      { css: [], js: [], additionalHead: [] },
      [],
    ) as AsyncGenerator<string>)
      results.push(file);
    expect(results).toEqual([]);
  });
});
