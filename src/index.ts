import { $ } from "bun";
import Client from "mppclone-client";

const cl = new Client(
  "wss://mppclone.com:8443",
  process.env.MPPCLONE_TOKEN as string,
);
cl.start();
cl.setChannel("✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧");

let prefix = "$";
let evalPrefix = ">";

cl.on("hi", () => {
  console.log("Connected to MPP.net");
});

$.env({

});

cl.on("a", async (msg) => {
  if (msg.p._id !== "ead940199c7d9717e5149919") return;

  if (msg.a.startsWith(prefix)) {
    const cmd = msg.a.substring(prefix.length).trim();
    const [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19, arg20, arg21, arg22, arg23, arg24] = cmd.split(" ");
    let out;
    console.log(`Running ${cmd}`);
    try {
      out = await $`${arg1 ?? ""} ${arg2 ?? ""} ${arg3 ?? ""} ${arg4 ?? ""} ${arg5 ?? ""} ${arg6 ?? ""} ${arg7 ?? ""} ${arg8 ?? ""} ${arg9 ?? ""} ${arg10 ?? ""} ${arg11 ?? ""} ${arg12 ?? ""} ${arg13 ?? ""} ${arg14 ?? ""} ${arg15 ?? ""} ${arg16 ?? ""} ${arg17 ?? ""} ${arg18 ?? ""} ${arg19 ?? ""} ${arg20 ?? ""} ${arg21 ?? ""} ${arg22 ?? ""} ${arg23 ?? ""} ${arg24 ?? ""} 2>&1`;
    } catch (err) {
      return cl.sendArray([{
        m: "a",
        message: `❌ ${err}`
      }]);
    }

    if (!out) {
      return cl.sendArray([{
        m: "a",
        message: `- No output`
      }]);
    }
    
    const stdout = out.stdout.toString().split("\n").join(" ").substring(0, 508)
    console.log("stdout:", stdout);

    const stderr = out.stderr.toString().split("\n").join(" ").substring(0, 508)
    console.log("stderr:", stderr);

    cl.sendArray([
      {
        m: "a",
        message: "-> " + stdout.toString().trim() || stderr.toString().trim(),
      },
    ]);
  }

  if (msg.a.startsWith(evalPrefix)) {
    try {
      const out = eval(msg.a.substring(evalPrefix.length));
      cl.sendArray([{ m: "a", message: `🐈 ${out}` }]);
    } catch (err) {
      cl.sendArray([{ m: "a", message: `💀 ${err}` }]);
    }
  }
});
