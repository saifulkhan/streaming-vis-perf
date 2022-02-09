def convert_bytes(size, unit=None):
    """
    This function converts byes to KB, MB and GB
    """
    if unit == "KB":
        return round(size / 1024, 0)
    elif unit == "MB":
        return round(size / (1024 * 1024), 0)
    elif unit == "GB":
        round(size / (1024 * 1024 * 1024), 0)
    else:
        return size
