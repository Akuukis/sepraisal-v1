export interface MaterialDTO {
  type: string;
  subtype: string;
  mass: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export interface MaterialCreationProps {
  time: number,
  prerequisites: { [title: string]: number, }
}

export abstract class Material {
  type: string;
  subtype: string;
  weight: number;  // kg.
  time?: number;  // Seconds to build, baseBuildTime.
  prerequisites?: {
    [title: string]: number,
  }

  constructor(dto: MaterialDTO) {
    this.type = dto.type;
    this.subtype = dto.subtype;
    this.weight = dto.mass;
    if(dto.time) this.time = dto.time;
    if(dto.prerequisites) this.prerequisites = dto.prerequisites;
  }

  get title() { return `${this.type}/${this.subtype}`}

  toJSON() {
    return {
      type: this.type,
      subtype: this.subtype,
      weight: this.weight,
      time: this.time,
      prerequisites: this.prerequisites && {...this.prerequisites},
    }
  }

}
