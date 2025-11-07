"""SQL extraction helpers with Google-style docstrings."""
from typing import Optional, Any
import pandas as pd

def extract_providers(conn: Any, since: Optional[str] = None) -> pd.DataFrame:
    """Extract providers incrementally from SQL.

    Args:
        conn: A DB-API compatible connection or SQLAlchemy engine.
        since: ISO-8601 string to filter recently updated rows.

    Returns:
        pandas.DataFrame: Raw provider rows.
    """
    # Example only (replace with real query execution)
    return pd.DataFrame([{"npi": "123", "name": "Alice Clinic"}])
