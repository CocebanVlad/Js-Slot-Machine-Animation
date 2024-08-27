class Reel {
  constructor(parent) {
    const reel = document.createElement("div");
    reel.className = "reel";
    reel.style.height = `${REEL_HEIGHT}px`;
    parent.appendChild(reel);

    const symbols = shuffleArray([...SYMBOLS]).map((symbol, index) => {
      const div = document.createElement("div");
      div.className = "symbol";
      div.style.height = `${SYMBOL_HEIGHT}px`;
      div.style.bottom = `${SYMBOL_HEIGHT * index - SYMBOL_HEIGHT / 2}px`;
      div.textContent = symbol;
      div.symbol = symbol;
      return div;
    });

    const symbolsToRender = Math.ceil(reel.clientHeight / SYMBOL_HEIGHT) + 1;

    for (
      let index = 0;
      index < symbolsToRender && index < symbols.length;
      index++
    ) {
      const symbol = symbols[index];
      reel.appendChild(symbol);
    }

    let interval = null;

    function spin(winSymbol, onComplete) {
      let step = SPIN_STEP;
      let friction = 0;
      let iteration = 0;

      if (interval) {
        clearInterval(interval);
      }

      function internalSpin() {
        if (step <= 0) {
          clearInterval(interval);
          return;
        }

        let winSymbolDistance;

        symbols.forEach((div) => {
          const bottom = parseFloat(div.style.bottom);
          let newBottom = bottom - step;
          if (newBottom < REEL_HEIGHT - PAGE) {
            newBottom += PAGE;
          }

          div.style.bottom = `${newBottom}px`;

          const rendered = reel.contains(div);
          if (newBottom <= -SYMBOL_HEIGHT) {
            if (rendered) {
              div.remove();
            }
          } else if (newBottom <= REEL_HEIGHT) {
            if (!rendered) {
              reel.append(div);
            }
          }

          if (div.symbol === winSymbol) {
            const distance =
              newBottom < 0 ? newBottom + PAGE_OFFSET : newBottom;
            winSymbolDistance = distance - CENTER;
          }
        });

        if (iteration > FRICTION_FREE_ITERATIONS) {
          const force = friction * DRAG_FORCE;
          const newStep = step - force;

          if (newStep > DRAG_THRESHOLD) {
            step = newStep;
            friction++;
          } else {
            if (winSymbolDistance > 0) {
              const decelerationFactor = step / winSymbolDistance;

              // Apply an exponential easing-out curve to the step decrement
              const easing = decelerationFactor ** 2;
              step -= easing * step;

              if (winSymbolDistance < 0.01) {
                execFn(onComplete);
                clearInterval(interval);
              } else if (step <= 0 && winSymbolDistance > 0) {
                step = 5;
              }
            }
          }
        }

        iteration++;
      }

      interval = setInterval(internalSpin, FRAME_RATE);
    }

    this.spin = spin;

    this.stop = () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }
}
