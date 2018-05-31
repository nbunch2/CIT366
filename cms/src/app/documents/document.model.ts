export class Documents {
  public id: number;
  public name: string;
  public description: string;
  public url: string;
  public children: Documents[];

  constructor(id: number, name: string, description: string, url: string, children: Documents[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }

}
