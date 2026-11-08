import { redirect } from "next/navigation";

/** The Manifesto is now object 001; keep old links working. */
export default function Edition009Redirect() {
  redirect("/edition/001");
}
