import { useEffect, useState } from "react";

// реализация функции useDebounce (кастомный хук) для оптимизации набора символов в input и отправки запроса
export function useDebounce(value: string, delay: number = 300): string {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler) // чтобы Timeout не отрабатывал каждый раз в случае, если что-то изменили заранее в компоненте, то его нужно будет очистить: handler будет возвращаться из useEffect внутри clearTimeout
  }, [value, delay])

  return debounced
}
