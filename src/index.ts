import {
  SubjectAsObservable,
  SubjectAsObserver,
  AsyncSubjectObservable
} from './Subject/index';

import { BufferOperator } from './Operator/index';

SubjectAsObservable();
setTimeout(() => SubjectAsObserver(), 1000);

setTimeout(() => AsyncSubjectObservable(), 1000);

BufferOperator();
