type PathObject = Record<string, object | string>;
const paths = {
  root: "",
  main: {
    root: "/",
    home: "/",
    tours: {
      root: "tours",
      list: "list",
      new: "new",
      details: ":id",
    },
  },
  auth: {
    root: "auth",
    login: "login",
    signUp: {
      root: "sign-up",
      google: "google",
      github: "github",
    },
  },
  notFound: "404",
  serverError: "500",
};

export const fullPath = () => {
  const absolutePaths = toAbsolutePath("", window.structuredClone(paths));
  console.log({ absolutePaths });
};

const toAbsolutePath = <T extends PathObject>(bastPath: string, paths: T) => {
  let key: keyof T;
  type Value = T[keyof T];
  for (key in paths) {
    {
      if (typeof paths[key] === "string") {
        if (paths[key] === "/") paths[key] = `${bastPath}/` as Value;
        else paths[key] = `${bastPath}/${paths[key]}` as Value;
      } else {
        paths[key] = toAbsolutePath(
          paths["root"] as string,
          paths[key] as unknown as T,
        ) as unknown as Value;
      }
    }
  }
  return paths;
};
console.log("whs");
fullPath();
export default paths;
