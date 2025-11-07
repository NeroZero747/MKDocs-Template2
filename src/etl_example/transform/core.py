"""Transform helpers."""
import pandas as pd

def normalize_names(df: pd.DataFrame) -> pd.DataFrame:
    """Normalize provider names.

    Args:
        df: Input dataframe with a `name` column.

    Returns:
        pandas.DataFrame: Dataframe with `name_normalized` column.
    """
    out = df.copy()
    out["name_normalized"] = out["name"].str.strip().str.title()
    return out
