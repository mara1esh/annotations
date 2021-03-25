export type AnnotationPos = {
  x: number;
  y: number;
};

export type Annotation = {
  id: number;
  author: string;
  comment: string;
  pos: AnnotationPos;
};
