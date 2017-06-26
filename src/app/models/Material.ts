export interface MaterialCreationProps {
  time: number,
  prerequisites: { [title: string]: number, }
}

export class Material {
  type: string;
  subtype: string;
  weight: number;  // kg.
  time?: number;  // Seconds to build, baseBuildTime.
  prerequisites?: {
    [title: string]: number,
  }

  constructor(type: string, subtype: string, weight: number, creation?: MaterialCreationProps) {
    this.type = type;
    this.subtype = subtype;
    this.weight = weight;
    if(creation) this.time = creation.time;
    if(creation) this.prerequisites = creation.prerequisites;
  }

  get title() { return `${this.type}/${this.subtype}`}

}
