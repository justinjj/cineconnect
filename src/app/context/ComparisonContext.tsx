"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type SelectedActor = {
  id: number;
  name: string;
  profileImage: string | null;
};

type ComparisonContextValue = {
  selectedActors: SelectedActor[];
  addActor: (actor: SelectedActor) => void;
  removeActor: (actorId: number) => void;
  clearActors: () => void;
};

const ComparisonContext =
  createContext<ComparisonContextValue | undefined>(
    undefined
  );

type ComparisonProviderProps = {
  children: ReactNode;
};

export function ComparisonProvider({
  children,
}: ComparisonProviderProps) {
  const [selectedActors, setSelectedActors] =
    useState<SelectedActor[]>([]);

  const addActor = (actor: SelectedActor) => {
    setSelectedActors((current) => {
      // Don't add the same actor twice
      if (
        current.some(
          (selected) => selected.id === actor.id
        )
      ) {
        return current;
      }

      // We only support a pair
      if (current.length >= 2) {
        return current;
      }

      return [...current, actor];
    });
  };

  const removeActor = (actorId: number) => {
    setSelectedActors((current) =>
      current.filter(
        (actor) => actor.id !== actorId
      )
    );
  };

  const clearActors = () => {
    setSelectedActors([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedActors,
        addActor,
        removeActor,
        clearActors,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);

  if (!context) {
    throw new Error(
      "useComparison must be used inside ComparisonProvider"
    );
  }

  return context;
}