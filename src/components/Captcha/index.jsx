import { useEffect, useRef, useCallback, forwardRef } from 'react';
import ProTypes from 'prop-types';

const Captcha = forwardRef(
  ({ height = 40,
    width = 100,
    bgColor = '#DFF0D8',
    charNum = 4,
    fontSize = 25,
    noiseLevel = 50, // 噪点的数量
    lineLevel = 3, // 干扰线的数量
    onChange }, ref) => {
    const canvasRef = useRef(null);

    const generateCaptcha = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // 定义验证码的字符集
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      // 生成随机验证码
      let captcha = '';
      for (let i = 0; i < charNum; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters[randomIndex];
      }

      // 绘制验证码背景
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制噪点
      for (let i = 0; i < noiseLevel; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = '#888';
        ctx.fillRect(x, y, 1, 1);
      }

      // 绘制干扰线
      for (let i = 0; i < lineLevel; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        ctx.strokeStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 绘制验证码文本
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(captcha, canvas.width / 2, canvas.height / 2);

      // 调用 onChange 回调函数传递验证码
      if (typeof onChange === 'function') {
        onChange(captcha);
      }
    }, [bgColor, charNum, fontSize, noiseLevel, lineLevel, onChange]);

    const refreshCaptcha = () => {
      generateCaptcha();
    };

    useEffect(() => {
      generateCaptcha();
    }, [generateCaptcha]);

    if (ref) {
      ref.current = {
        refreshCaptcha,
      };
    }

    return (
      <div>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={refreshCaptcha}
        ></canvas>
      </div>
    );
  },
);

Captcha.displayName = 'Captcha';

Captcha.propTypes = {
  width: ProTypes.number,
  height: ProTypes.number,
  charNum: ProTypes.number,
  fontSize: ProTypes.number,
  bgColor: ProTypes.string,
  noiseLevel: ProTypes.number,
  lineLevel: ProTypes.number,
  onChange: ProTypes.func,
};

export default Captcha;
