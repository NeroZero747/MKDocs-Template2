"""Pins loader stubs."""
from typing import Any
import pandas as pd

def write_pin(df: pd.DataFrame, name: str, board: Any = None) -> None:
    """Write a dataframe to a Pin (stub).

    Args:
        df: Dataframe to persist.
        name: Pin name (e.g., 'providers_master').
        board: Optional board/client, if not using default config.
    """
    # TODO: Implement real upload logic
    pass
