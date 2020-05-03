(function () {
  const addNameEffect = () => {
    const name = document.querySelector('.name');
    const nameWrapper = document.querySelector('.nameWrapper');
    const walk = 50; // 50px
    function shadow(e) {
      const { offsetWidth: width, offsetHeight: height } = nameWrapper;
      let { offsetX: x, offsetY: y } = e;
      if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
      }
      const xWalk = Math.round((x / width) * walk - walk / 2);
      const yWalk = Math.round((y / height) * walk - walk / 2);
      name.style.textShadow = `
            ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
            ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
            ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
            ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
            `;
    }
    nameWrapper.addEventListener('mousemove', shadow);
  };

  const toggleLongStrings = () => {
    const wrapper = document.querySelector('.content');
    const textArr = Array.from(wrapper.querySelectorAll('li > p'));
    const lengthLimit = 150;
    const longStringsArr = textArr.filter((p) => p.innerText.length > lengthLimit);

    longStringsArr.forEach((item) => {
      item.classList.add('hidden', 'longText__item');
      const originIcon = document.createElement('span');
      originIcon.classList.add('tooltip', 'longText__icon');
      originIcon.innerHTML = `<i class="fas fa-eye-slash"></i><span class="tooltip__text">Hide</span>`;
      item.appendChild(originIcon);

      const copy = document.createElement('p');
      copy.textContent = item.innerText.slice(0, 150);
      copy.classList.add('longText__item');
      const toggleIcon = document.createElement('span');
      toggleIcon.classList.add('tooltip', 'longText__icon');
      toggleIcon.innerHTML = `<i class="far fa-eye"></i><span class="tooltip__text">Show more</span>`;
      copy.appendChild(toggleIcon);
      item.parentElement.appendChild(copy);
    });

    wrapper.addEventListener('click', (e) => {
      if (!e.target.closest('.longText__icon')) {
        return;
      }
      const parent = e.target.closest('li');
      const toggledArr = Array.from(parent.querySelectorAll('.longText__item'));
      toggledArr.forEach((item) => item.classList.toggle('hidden'));
    });
  };

  const addBgRain = () => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    document.querySelector('main').appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: false });

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const offsetX = 0;
    const mouseX = 0;
    const mouseDown = false;
    let time;
    const elementImg = document.createElement('img');
    const theElement = {
      img: elementImg,
      width: 0,
      height: 0,
      x: centerX,
      y: centerY,
    };

    let elementsArr = [];
    let count = 30;

    function addElement(x, y, w) {
      const h = Math.ceil((w * theElement.height) / theElement.width);
      const v = w * 0.004;
      elementsArr.push({ x, y, w, h, v });
    }

    function update(dt) {
      for (let i = 0; i < elementsArr.length; i++) {
        elementsArr[i].y += dt * elementsArr[i].v;
        elementsArr[i].x = elementsArr[i].x + offsetX * elementsArr[i].v * 0.1;

        if (mouseDown) {
          offsetX = mouseX - centerX;
        }

        if (elementsArr[i].y > canvas.height) {
          elementsArr[i].x = Math.random() * canvas.width;
          elementsArr[i].y = -elementsArr[i].h;
        }
      }
    }

    function draw() {
      requestAnimationFrame(draw);

      let now = new Date().getTime();
      let dt = now - (time || now);
      time = now;
      update(dt);

      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < elementsArr.length; i++) {
        ctx.drawImage(
          theElement.img,
          elementsArr[i].x,
          elementsArr[i].y,
          elementsArr[i].w,
          elementsArr[i].h
        );
        const randomRotate = Math.random() * (+0 - +360) + +360;
        ctx.rotate(randomRotate);
      }
    }

    theElement.img.src =
      'https://raw.githubusercontent.com/Max-im/homepage/master/assets/dollar.png';

    theElement.img.onload = function () {
      theElement.width = theElement.img.width / 2;
      theElement.height = theElement.img.height / 2;
      theElement.x = centerX - theElement.width / 2;
      theElement.y = centerY - theElement.height / 2;

      for (let i = 0; i < count; i++) {
        addElement(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          theElement.width * 0.2 + Math.random() * (theElement.width * 0.6)
        );
      }

      elementsArr.sort(function (a, b) {
        return a.w - b.w;
      });

      draw();
    };
  };

  const addDropdown = () => {
    const triggersArr = document.querySelectorAll('.dropdown__trigger');

    const showDropdown = (e) => {
      const parent = e.target.closest('.dropdown');
      const content = parent.querySelector('.dropdown__content');
      content.classList.add('dropdown__content_far');
      content.classList.remove('hidden');
      setTimeout(() => content.classList.remove('dropdown__content_far'), 10);
    };

    const hideDropdown = (e) => {
      const parent = e.target.closest('.dropdown');
      const content = parent.querySelector('.dropdown__content');
      content.classList.add('hidden');
      content.classList.remove('dropdown__content_far');
    };

    triggersArr.forEach((item) => item.addEventListener('mouseenter', showDropdown));
    triggersArr.forEach((item) => item.addEventListener('mouseleave', hideDropdown));
  };

  // init
  addNameEffect();
  toggleLongStrings();
  addBgRain();
  addDropdown();
})();
