import esbuild from "esbuild";

async function build(): Promise<void> {
  try {
      const baseOptions = {
        entryPoints: ["src/main.tsx"],
        bundle: true, 
        minify: true, 
        treeShaking: true, 
        sourcemap: true,
      };
      await esbuild.build({
         ...baseOptions, 
         format: "iife", 
        outfile: "dist/agora-ui-kit.min.js", 
      });
      await esbuild.build({
        ...baseOptions,  
        format: "esm", 
        outfile: "dist/agora-ui-kit.esm.js", 
      });
      await esbuild.build({
        ...baseOptions,  
        format: "cjs", 
        outfile: "dist/agora-ui-kit.cjs", 
      });
      console.log("Build completed successfully.");
  } catch(error) {
    console.log("Build failed.");
    console.log(error);
  }
}

build();

