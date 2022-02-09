import matplotlib.pyplot as plt
import math


def plot_payload_size(x, y1, y2, unit="bytes"):
    """
    TODO
    """
    fig = plt.figure(figsize=(6, 3), tight_layout=True)
    ax = fig.gca()

    plt.plot(x, y1, "-", linewidth=2, color="tomato", label="UTF-8")
    plt.plot(x, y2, "-", linewidth=2, color="royalblue", label="ProtoBuf")

    # x, y labels
    plt.xlabel("frequency channels", fontsize=12)
    plt.ylabel(f"payload size (in {unit})", fontsize=12)

    # change x, y range to start from min and max data
    ax.set_xlim([x[0], x[-1]])
    ax.set_ylim([math.floor(min(y1[0], y2[0])), math.ceil(max(y1[-1], y2[-1]))])

    # tick labels font
    ax.tick_params(axis="both", which="major", labelsize=12)
    ax.tick_params(axis="both", which="minor", labelsize=12)

    # title
    # plt.title('Two or more lines on same plot with suitable legends ')

    # legend
    plt.legend(fontsize=12, loc="lower right")

    # grid
    plt.grid(linestyle="--", linewidth="1", color="black", alpha=0.2)

    # spines: https://matplotlib.org/stable/api/spines_api.html
    ax.spines["top"].set(
        visible=True, linestyle="--", linewidth="1", color="black", alpha=0.2
    )
    ax.spines["right"].set(
        visible=True, linestyle="--", linewidth="1", color="black", alpha=0.2
    )

    plt.show()


def plot_deserialisation_time(y, x=[]):
    """
    TODO
    """
    fig = plt.figure(figsize=(8, 4), tight_layout=True)
    ax = fig.gca()

    # plt.plot(x, y1, "-", linewidth=2, color="tomato", label="UTF-8")
    # plt.plot(x, y2, "-", linewidth=2, color="royalblue", label="ProtoBuf")

    # x, y labels
    plt.xlabel("frequency channels", fontsize=12)
    plt.ylabel(f"time (in ms)", fontsize=12)

    # change x, y range to start from min and max data
    # ax.set_xlim([x[0], x[-1]])
    # ax.set_ylim([math.floor(min(y1[0], y2[0])), math.ceil(max(y1[-1], y2[-1]))])

    # tick labels font
    ax.tick_params(axis="both", which="major", labelsize=12)
    ax.tick_params(axis="both", which="minor", labelsize=12)

    # title
    # plt.title('Two or more lines on same plot with suitable legends ')

    # legend
    # plt.legend(fontsize=12, loc="lower right")

    # grid
    plt.grid(linestyle="--", linewidth="1", color="black", alpha=0.2)

    # spines: https://matplotlib.org/stable/api/spines_api.html
    ax.spines["top"].set(
        visible=True, linestyle="--", linewidth="1", color="black", alpha=0.2
    )
    ax.spines["right"].set(
        visible=True, linestyle="--", linewidth="1", color="black", alpha=0.2
    )

    ax.boxplot(y, labels=x)

    plt.show()
