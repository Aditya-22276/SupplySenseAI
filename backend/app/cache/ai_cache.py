import json
import os
from datetime import datetime, timedelta


CACHE_DIR = "app/cache/files"

os.makedirs(CACHE_DIR, exist_ok=True)


class AICache:

    CACHE_EXPIRY_HOURS = 24

    @staticmethod
    def _file_path(name):

        return os.path.join(
            CACHE_DIR,
            f"{name}.json"
        )

    @staticmethod
    def load(name):

        file_path = AICache._file_path(name)

        if not os.path.exists(file_path):
            return None

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)

        created = datetime.fromisoformat(
            data["created_at"]
        )

        if datetime.now() - created > timedelta(
            hours=AICache.CACHE_EXPIRY_HOURS
        ):

            os.remove(file_path)

            return None

        return data["response"]

    @staticmethod
    def save(name, response):

        file_path = AICache._file_path(name)

        data = {

            "created_at": datetime.now().isoformat(),

            "response": response

        }

        with open(
            file_path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                data,
                file,
                indent=4,
                ensure_ascii=False
            )