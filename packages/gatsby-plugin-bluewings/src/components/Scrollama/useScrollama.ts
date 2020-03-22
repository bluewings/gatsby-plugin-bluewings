/* eslint-disable no-restricted-globals */
import { useEffect, useMemo, useRef, useReducer } from 'react';
import scrollama from 'scrollama';
import 'intersection-observer';
import styles from './Scrollama.module.scss';

const STEP_ENTER = 'step-enter';
const STEP_PROGRESS = 'step-progress';
const STEP_EXIT = 'step-exit';

const initialState = {
  index: null,
  progress: null,
  rect: null,
  index_: null,
  progress_: null,
  rect_: null,
  stage: null,
};

function reducer(state: any, action: any) {
  const { type, payload, indexToStage, stageProgress } = action;
  switch (type) {
    case STEP_ENTER: {
      const { element, index: index_, direction } = payload;
      const progress_ = direction === 'down' ? 0 : 1;
      const elRect = element.getBoundingClientRect();
      const top = elRect.top + document.documentElement.scrollTop || document.body.scrollTop;
      const left = elRect.left + document.documentElement.scrollLeft || document.body.scrollLeft;
      const rect = {
        width: elRect.width,
        height: elRect.height,
        top,
        left,
        right: left + elRect.width,
        bottom: top + elRect.height,
      };
      const [stage_, stageIndex_] = indexToStage(index_);
      return {
        ...state,
        index: index_,
        progress: progress_,
        rect,
        index_: index_,
        progress_: progress_,
        rect_: rect,
        stage: stage_,
        stageProgress: stageProgress(index_, stageIndex_, progress_),
      };
    }
    case STEP_PROGRESS: {
      const { index, progress } = payload;
      const [stage, stageIndex] = indexToStage(index);
      return {
        ...state,
        index,
        progress,
        index_: index,
        progress_: progress,
        stage,
        stageProgress: stageProgress(index, stageIndex, progress),
      };
    }
    case STEP_EXIT: {
      return { ...state, index: null, rect: null, progress: null };
    }
    default:
      return state;
  }
}

const DEFAULT_OFFSET = 0.5;

function useScrollama(props: any) {
  const step = props.step || '';

  const _offset = props.offset || '';

  const offset: any = useMemo(() => {
    const value = Number(_offset);
    return isNaN(value) ? DEFAULT_OFFSET : value;
  }, [_offset]);

  const progress = !!props.progress;

  const demo = !!props.demo;

  const [state, dispatch] = useReducer(reducer, initialState);

  // show guideline
  useEffect(() => {
    if (demo) {
      const guide = document.createElement('div');
      document.body.appendChild(guide);
      guide.classList.add(styles.guide);
      guide.innerText = `"${step}" trigger: ${offset}`;
      guide.style.top = `${offset * 100}%`;
      return () => {
        document.body.removeChild(guide);
      };
    }
    return () => null;
  }, [step, offset, demo]);

  const stages = useRef<any>([]);
  const stageMap = useRef<any>({});

  useEffect(() => {
    if (step && document.body.querySelectorAll(step).length > 0) {
      stages.current = Array.from(document.body.querySelectorAll(step)).map((e) => {
        return e.getAttribute('data-stage');
      });
      stageMap.current = {};

      const stages2 = Array.from(document.body.querySelectorAll(step)).map((e) => e.getAttribute('data-stage'));

      const indexToStage = (() => {
        const cache: any = {};
        return (index: number) => {
          if (cache[index] === undefined) {
            const stage =
              stages2
                .slice(0, index + 1)
                .filter((e) => e)
                .pop() || null;
            cache[index] = [stage, stages2.indexOf(stage)];
          }
          return cache[index];
        };
      })();

      const stageProgress = (index: number, stageIndex: number, progress: number) => {
        if (index === stageIndex) {
          return progress;
        }
        return index < stageIndex ? 0 : 1;
      };

      const scroller = scrollama();
      scroller
        .setup({ step, offset, progress })
        .onStepEnter((payload: any) => dispatch({ type: STEP_ENTER, payload, indexToStage, stageProgress }))
        .onStepProgress((payload: any) =>
          dispatch({
            type: STEP_PROGRESS,
            payload,
            indexToStage,
            stageProgress,
          }),
        )
        .onStepExit((payload: any) => dispatch({ type: STEP_EXIT, payload, indexToStage, stageProgress }));
      window.addEventListener('resize', scroller.resize);
      return () => {
        window.removeEventListener('resize', scroller.resize);
        scroller.destroy();
      };
    }
    return () => null;
  }, [step, offset, progress, dispatch]);

  return state;
}

export default useScrollama;
