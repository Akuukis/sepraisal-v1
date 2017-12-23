export interface MaterialDTO {
  type: string;
  subtype: string;
  mass?: number;
  volume?: number;
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
  mass: number;  // kg.
  volume: number;  // l.
  time?: number;  // Seconds to build, baseBuildTime.
  prerequisites?: {
    [title: string]: number,
  }

  constructor(dto: MaterialDTO) {
    this.type = dto.type;
    this.subtype = dto.subtype;
    this.mass = dto.mass;
    this.volume = dto.volume;
    if(dto.time) this.time = dto.time;
    if(dto.prerequisites) this.prerequisites = dto.prerequisites;
  }

  get title() { return `${this.type}/${this.subtype}`}

  toJSON() {
    return {
      type: this.type,
      subtype: this.subtype,
      weight: this.mass,
      time: this.time,
      prerequisites: this.prerequisites && {...this.prerequisites},
    }
  }

}
