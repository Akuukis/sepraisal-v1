/** Global definitions for developement **/

// for style loader
declare module '*.jpg' {
  const content: any;
  export = content;
}

// for .sbc that are XMLs
declare module '*.sbc' {
  const content: string;
  export = content;
}
