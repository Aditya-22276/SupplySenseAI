from airflow import DAG
from airflow.operators.bash import BashOperator

from datetime import datetime


default_args = {
    "owner": "aditya"
}


with DAG(
    dag_id="supplysense_model_retraining",
    start_date=datetime(2025, 1, 1),
    schedule="@daily",
    catchup=False,
    default_args=default_args
) as dag:

    retrain_models = BashOperator(
    task_id="retrain_models",
    bash_command="""
    cd /opt/airflow &&
    python /opt/airflow/backend/app/ml/train_models.py
    """
)

    retrain_models