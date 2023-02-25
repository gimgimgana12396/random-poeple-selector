import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Random.scss';
import Coundown from './common/Coundown';

const Random = () => {
  const [input, setInput] = useState({
    text: '',
    num: 0,
    inputTitle: '추첨 대상',
    resultTitle: '추첨 결과',
  });
  const [memberList, setMemberList] = useState({ number: 0, name: '' });
  const [result, setResult] = useState([]);
  const [countdown, setCountdown] = useState(false);
  const [test, setTest] = useState('');
  const [showRemadeText, setShowRemadeText] = useState(false);

  const makeShowText = () => {
    setShowRemadeText(!showRemadeText);
  };

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

  const StartCountdown = () => {
    setCountdown(true);
    setResult([]);

    setTimeout(() => {
      setCountdown(false);
      RandomSelect();
    }, 3500);
  };

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
    if (!showRemadeText) return;

    const tmp = input.text
      .replaceAll('\t', ' ')
      .split('\n')
      .reduce(function (pre, cur, i) {
        if (i % 2 === 0) return `${pre}\n${cur}`;
        return `${pre}\t${cur}`;
      });

    setTest(tmp);
  }, [input.text, showRemadeText]);

  return (
    <div className="input-area">
      {countdown && <Coundown />}
      <div className="input-wrapper">
        <div className="input-filed">
          <input
            className="result-title"
            name="inputTitle"
            value={input.inputTitle}
            onChange={InputHandler}
          />
          {showRemadeText ? (
            <div className="remade-text">{test}</div>
          ) : (
            <textarea
              className="word-area"
              placeholder="값을 입력"
              onChange={InputHandler}
              value={input.text}
              name="text"
            />
          )}
        </div>
        <div className="button-wrapper">
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
          <button disabled={input.num === 0} onClick={StartCountdown}>
            START
          </button>
          <button onClick={makeShowText}>
            {showRemadeText ? '입력하기' : '정리하기'}
          </button>
        </div>
      </div>
      <div className="result">
        <input
          className="result-title"
          name="resultTitle"
          value={input.resultTitle}
          onChange={InputHandler}
        />
        <div className="result-text">
          {result &&
            result.map((member, i) => {
              return `${i + 1}. ${member.name} (${member.number})\n`;
            })}
        </div>
      </div>
    </div>
  );
};

export default Random;
