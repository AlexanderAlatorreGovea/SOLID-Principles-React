const api = "https://mock";

export class HackerNewsService {
  constructor(private http) {}

  getNews() {
    return this.http.get(api);
  }
}
