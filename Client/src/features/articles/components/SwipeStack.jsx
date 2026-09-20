import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ArticleCard from "./ArticleCard";
import { addArticleVu } from "../api/articlesVus.api";

const SwipeStack = forwardRef(function SwipeStack(
  {
    articles = [],
    onSwipe,
    onArticleChange,
  },
  ref,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const currentArticle = articles[currentIndex];

  useEffect(() => {
    if (onArticleChange) {
      onArticleChange(currentArticle ?? null);
    }
  }, [currentArticle, onArticleChange]);

  const resetCard = () => {
    setDragX(0);
    setIsDragging(false);
  };

  const completeSwipe = async (direction) => {
    const article = articles[currentIndex];

    if (!article) {
      return;
    }

    if (onSwipe) {
      onSwipe(direction, article);
    }

    try {
      if (article.Id_articles) {
        await addArticleVu(article.Id_articles);
      }
    } catch (error) {
      console.error(
        "Erreur marquage article comme vu :",
        error,
      );
    }

    // Swipe droite :
    // on garde l'article actuel affiché pour le modal.
    if (direction === "right") {
      setDragX(0);
      setIsDragging(false);
      return;
    }

    // Swipe gauche :
    // on passe directement à l'article suivant.
    setCurrentIndex((index) => index + 1);
    resetCard();
  };

  useImperativeHandle(ref, () => ({
    pass: () => completeSwipe("left"),

    next: () => {
      setCurrentIndex((index) => index + 1);
      resetCard();
    },
  }));

  const handlePointerDown = (event) => {
    startX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return;
    }

    const distance = event.clientX - startX.current;
    setDragX(distance);
  };

  const finishDrag = (distance) => {
    const threshold = 120;

    if (distance > threshold) {
      completeSwipe("right");
      return;
    }

    if (distance < -threshold) {
      completeSwipe("left");
      return;
    }

    resetCard();
  };

  const handlePointerUp = (event) => {
    if (!isDragging) {
      return;
    }

    const distance = event.clientX - startX.current;
    finishDrag(distance);
  };

  const handlePointerCancel = () => {
    resetCard();
  };

  if (!currentArticle) {
    return (
      <div className="flex min-h-107.5 items-center justify-center rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100">
        <div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
            ✓
          </div>

          <h2 className="text-lg font-bold text-text">
            Tu as tout vu !
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Il n'y a plus d'articles disponibles pour le moment.
          </p>
        </div>
      </div>
    );
  }

  const rotation = dragX / 20;
  const opacity = Math.max(
    0.75,
    1 - Math.abs(dragX) / 500,
  );

  return (
    <div className="relative w-full max-w-sm touch-none select-none">
      <div
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{
          transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
          opacity,
          transition: isDragging
            ? "none"
            : "transform 180ms ease, opacity 180ms ease",
        }}
      >
        <ArticleCard article={currentArticle} />
      </div>

      {dragX !== 0 && (
        <div
          className={`pointer-events-none absolute left-5 top-5 rounded-xl px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg ${
            dragX > 0 ? "bg-accent" : "bg-red-500"
          }`}
        >
          {dragX > 0 ? "Troc" : "Passer"}
        </div>
      )}
    </div>
  );
});

export default SwipeStack;