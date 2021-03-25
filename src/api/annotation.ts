import axios from 'axios';
import { Annotation } from '@typings/annotation';

export async function getAnnotations(): Promise<Annotation[]> {
  try {
    const { data } = await axios.get('annotations');
    return Array.isArray(data) ? (data as Annotation[]) : [];
  } catch (error) {
    console.error('[getAnnotations]', error);
  }
}

export async function removeAnnotation(id: number): Promise<void> {
  try {
    await axios.delete(`annotations/${id}`);
  } catch (error) {
    console.error('[removeAnnotation]', error);
  }
}

export async function createAnnotation(payload: Annotation): Promise<void> {
  try {
    await axios.post(`annotations`, payload);
  } catch (error) {
    console.error('[createAnnotation]', error);
  }
}
