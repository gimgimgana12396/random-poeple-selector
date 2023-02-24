import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Random.scss';

const Random = () => {
  const [input, setInput] = useState({ text: '', num: 0 });
  const [memberList, setMemberList] = useState({ number: 0, name: '' });
  const [result, setResult] = useState([]);

  const InputHandler = (e) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const RandomSelect = useCallback(() => {
    const tmp = [...memberList];
    const res = [];

    for (let i = 0; i < input.num; ) {
      const s = getRandom(0, tmp.length);

      res.push(tmp[s]);
      tmp.splice(s, 1);

      i += 1;
    }

    setResult(res);
  }, [input.num, memberList]);

  useEffect(() => {
    if (!input) return;

    setMemberList(
      input.text.split('\n').map((member) => {
        let tmp;

        if (member.includes('\t')) tmp = member.split('\t');
        else tmp = member.split(' ');

        return { number: tmp[0], name: tmp[1] };
      }),
    );
  }, [input, input.text]);

  useEffect(() => {
    if (!input.num) return;

    RandomSelect();
  }, [RandomSelect, input.num]);

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          className="word-area"
          placeholder="값을 입력"
          onChange={InputHandler}
          value={input.text}
          name="text"
        />
        <select
          name="num"
          className="select"
          value={input.num}
          onChange={InputHandler}
        >
          <option value={0} disabled defaultValue>
            0
          </option>
          {memberList.length >= 2 &&
            memberList.map((member, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
        </select>
      </div>
      <div className="result">
        <div className="result-title">추첨 결과</div>
        <div className="result-text">
          {result &&
            result.map((member, i) => {
              return `${i + 1}) 사원번호:${member.number} 성함:${
                member.name
              }\n`;
            })}
        </div>
      </div>
    </div>
  );
};

export default Random;
