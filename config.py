import os
import sys
from dotenv import load_dotenv
import snowflake.connector

WORKDIR = "/Users/catrombley/Jasper Reporting"


def require_env(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        print(f"Missing required environment variable: {var_name}")
        sys.exit(1)
    return value


def open_connection() -> snowflake.connector.SnowflakeConnection:
    load_dotenv(os.path.join(WORKDIR, ".env.local"))
    user = require_env("SNOWFLAKE_USER")
    pat = require_env("SNOWFLAKE_PAT")
    return snowflake.connector.connect(
        account="RRQUMEZ-FV29318",
        user=user,
        password=pat,
    )
