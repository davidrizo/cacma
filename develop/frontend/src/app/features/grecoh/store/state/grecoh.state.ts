import {APIRestServerError} from '../../../../core/model/restapi/apirest-server-error';
import {Painting} from '../../model/painting';
import {PaintingVersion} from '../../model/painting-version';
import {PaintingStatistics} from '../../model/painting-statistics';
import {PaintingVersionScore} from '../../model/painting-version-score';

export interface GrecohState {
  paintings: Painting[];
  selectedPainting: Painting;
  paintingVersions: PaintingVersion[];
  apiRestServerError: APIRestServerError;
  paintingStatistics: PaintingStatistics[];
  paintingVersionScores: PaintingVersionScore[];
  postScoresResult: boolean;
}

export const initialSemanticRepresentationState: GrecohState = {
  paintings: null,
  apiRestServerError: null,
  selectedPainting: null,
  paintingVersions: null,
  paintingStatistics: null,
  postScoresResult: null,
  paintingVersionScores: null
};

export function getInitialState(): GrecohState {
  return initialSemanticRepresentationState;
}
