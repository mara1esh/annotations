import { useState, useCallback } from 'react';
import type { Annotation, AnnotationPos } from '@typings/annotation';
import {
  getAnnotations,
  createAnnotation,
  removeAnnotation,
} from '@api/annotation';

export default function useAnnotations() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const fetchAnnotations = useCallback(async function () {
    try {
      const ann = await getAnnotations();
      setAnnotations(ann);
    } catch (error) {
      console.error('[fetchAnnotations]', error);
    }
  }, []);

  const createDraft = useCallback(
    function (pos: AnnotationPos): number {
      const draft: Annotation = {
        author: 'Valerii Shelihan',
        comment: null,
        id: annotations.length + 1,
        pos,
      };
      setAnnotations([...annotations, draft]);
      return draft.id;
    },
    [annotations],
  );

  const postAnnotation = useCallback(
    async function (id: number, comment: string) {
      let idx: number;
      let annotation: Annotation;

      annotations.forEach((a, index) => {
        if (a.id === id) {
          idx = index;
          annotation = a;
        }
      });
      const newAnnotation: Annotation = { ...annotation, comment };
      await createAnnotation(newAnnotation);
      annotations[idx].comment = newAnnotation.comment;
      setAnnotations(annotations);
    },
    [annotations],
  );

  const deleteAnnotation = useCallback(
    async function (id: number) {
      // TODO test removing with id 1
      if (annotations.find(i => i.id === id).comment) {
        await removeAnnotation(id);
      }
      setAnnotations(a => a.filter(i => i.id !== id));
    },
    [annotations],
  );

  return {
    annotations,
    fetchAnnotations,
    postAnnotation,
    deleteAnnotation,
    createDraft,
  };
}
