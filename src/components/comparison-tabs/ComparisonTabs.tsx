"use client";

import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { useAuth } from "@/hooks/useAuth";
import { TrendingPairs } from "../trending/TrendingPairs";
import { RecentComparisons } from "@/components/recent-comparisons/RecentComparisons";
import type { ComparisonTrend } from "@/types/trending";
import type { RecentComparison } from "@/types/recentComparison";

interface ComparisonTabsProps {
  onTrendingSelect: (trend: ComparisonTrend) => void;
  onRecentSelect: (comparison: RecentComparison) => void;
}

export function ComparisonTabs({
  onTrendingSelect,
  onRecentSelect,
}: ComparisonTabsProps) {
  const [tab, setTab] = useState(0);

  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && tab !== 0) {
      setTab(0);
    }
  }, [isAuthenticated, tab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Trending pairs" />

        {!loading && isAuthenticated && <Tab label="Recent comparisons" />}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <TrendingPairs onSelect={onTrendingSelect} />}

        {tab === 1 && isAuthenticated && (
          <RecentComparisons onSelect={onRecentSelect} />
        )}
      </Box>
    </Box>
  );
}
