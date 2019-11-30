class DateHelpers {
  /**
   * Convert Date object to readable format (Views in Arabic)
   *
   * @param dateTime string | Date
   * @returns string
   */
  public static convertToViewFormat = (dateTime?: string | Date): string => {
    if (!dateTime) {
      return '';
    }

    const date = new Date(dateTime);
    return Intl.DateTimeFormat('en-eg').format(date);
  };
}

export default DateHelpers;
