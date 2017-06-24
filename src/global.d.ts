/** Global definitions for developement **/

// for style loader
declare module '*.jpg' {
  const content: any;
  export = content;
}

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// for .sbc that are XMLs
declare module '*.sbc' {
  const content: string;
  export = content;
}
