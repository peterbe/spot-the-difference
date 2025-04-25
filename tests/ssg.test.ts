import { expect, test } from "bun:test";

test("about.html should have html and title", async () => {
  const html = await Bun.file("dist/about.html").text();
  expect(html).not.toContain('<div id="root"></div>');
  const match = html.match(/<title>(.*)<\/title>/);
  expect(match).not.toBeNull();
  if (match) {
    const title = match[1];
    expect(title).toContain("About");
  }
});

test("stats.html should have html and title", async () => {
  const html = await Bun.file("dist/stats.html").text();
  expect(html).not.toContain('<div id="root"></div>');
  const match = html.match(/<title>(.*)<\/title>/);
  expect(match).not.toBeNull();
  if (match) {
    const title = match[1];
    expect(title).toContain("Stats");
  }
});
