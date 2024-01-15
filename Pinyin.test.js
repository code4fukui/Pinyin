import * as t from "https://deno.land/std/testing/asserts.ts";
import { Pinyin } from "./Pinyin.js";

Deno.test("decode", () => {
  t.assertEquals(Pinyin.decode("ni1"), "nī");
  t.assertEquals(Pinyin.decode("meng2 dong4"), "méng dòng");
});
