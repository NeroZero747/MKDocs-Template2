# Members ETL

**Owner**: Data Engineering — DART  
**Schedule**: Daily @ 03:00 PT  
**SLA**: 20 min E2E

## Purpose

Publish a **member enrollment** dataset unified across lines of business.

## Inputs

- Oracle: `ENROLLMENT.MEMBERS` (columns: `member_id`, `dob`, `gender`, `plan`, `updated_at`)

## Parameters

| Name    | Type      | Default | Description                 |
| :------ | :-------- | :-----: | :-------------------------- |
| `since` | timestamp | `null`  | Incremental start timestamp |
| `plans` | list[str] |  `[]`   | Restrict to plan list       |

## Transform Rules

1. Ensure **unique member_id**
2. Validate DOB, mask PHI
3. Standardize **plan** codes

## Output

- **Pin**: `members_enrollment` (Parquet)
- **Schema**: `v1.0`

## Lineage

```mermaid
flowchart LR
  O[Oracle: ENROLLMENT.MEMBERS] --> T[Transform]
  T --> P[Pin: members_enrollment]
```

## Run

```bash
python -m etl_example.jobs.members --since "2025-11-01T00:00:00"
```
