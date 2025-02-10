class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields']; // sorguda bu field'ları siliyoruz.
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    /** gte, gt, lte, lt
       $gt (Greater Than): Belirtilen değerden büyük olanları bulur.
       $gte (Greater Than or Equal): Belirtilen değerden büyük v eya eşit olanları bulur.
       $lt (Less Than): Belirtilen değerden küçük olanları bulur.
       $lte (Less Than or Equal): Belirtilen değerden küçük veya eşit olanları bulur.
     */
    let queryStr = JSON.stringify(queryObj);

    /**
     * Bu tür bir kod, genellikle API endpoint'lerinde kullanıcıdan gelen sorgu parametrelerini
       MongoDB sorgularına dönüştürmek için kullanılır.
     * query'de gte,gt,lte,lt kelimesi geçiyorsa başına $ işarati ekler.
     */
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // 2 field içeren bir sıralama isteği gelirse string düzeltmesi yapılır.
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // default sort
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // fields=name,duration,difficulty,price
    if (this.queryString.fields) {
      // response'da hangi fieldların olacağını belirliyoruz.
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      /**
       * default fields. __v dışında tüm field'lar.
       * __v mongoose için gereken bir field. Kullanıcının görmesine gerek yok.
       */
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    /**
     * skip:
     * Örneğin kullanıcı 2. sayfadan 10 kayıt istedi.
     * Bu ilk 10 kayıdı görmezden gelmemiz anlamına geliyor. O yüzden skip kullanılır.
     * formül = (2 - 1) * 10 = 10; ilk 10 kayıtı atla.
     */
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
