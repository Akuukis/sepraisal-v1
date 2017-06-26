export class Material {
  type: string;
  subtype: string;
  weight: number;  // kg.
  time: number;  // Seconds to build, baseBuildTime.

  constructor(type: string, subtype: string, weight: number, time: number) {
    this.type = type;
    this.subtype = subtype;
    this.weight = weight;
    this.time = time;
  }

  get title() { return `${this.type}/${this.subtype}`}

}
