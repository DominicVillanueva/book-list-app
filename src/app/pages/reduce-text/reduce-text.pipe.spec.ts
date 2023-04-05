import { ReduceTextPipe } from './reduce-text.pipe';

describe('@ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('#should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('#should be use transform when value correctly', () => {
    const text = 'Book Description 1';
    const newText = pipe.transform(text, 13);
    expect(newText.length).toBe(13);
  });
});
