// app/firebaseAdmin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "rc-tech-solutions",
      clientEmail: "firebase-adminsdk-sxib3@rc-tech-solutions.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8X63SW765Gjhd\npx+rxCBPG27QyuNXgUH6nPgUESr3Aer/s3uR9Myovg4KFwAd94fa8UlSYNGWce14\nGvzQEM90iTxmX3kQ1WMg5J7rtRz7McPPY7BJrTJVxPRHTVP6++mgsBFPDDVvr/xD\nlHS9JgRz/74Cv/q7bPOrll019lELHxCsRghAULhbU4N+qzN0cSLvS0gYiCSYoTDP\nVo26M2hEG7wTxWYr+M9IL36dgBFR7VTh80O/1OEC/kJoUh+6bxgsPDBVlCOFPXDQ\nBaoOtPI6SO/eU6bZd3k0gfmjIQuVGmC5TkfWfE1PbPV0EfSMWMNaG+Co7sVvSYt7\nwFTrXvzZAgMBAAECggEATGu2jXY58EdSYbAo2ZrWDrHO6ba9t2TRexYOULnMR+xH\nxZevhH2fP7/m2zIMkpu2ylyEBf8QWCv9DnJIaTLArwLz9YY7C9i9//yv+mj+Cmxc\nh3jmbmVs273s6jZVYSes1stHIl4OGbL4MQR7vba8LMEueVggJMRlMJHuW7ODmnI7\nyW1ZsjThreKmPSpUEcGDSqHnxp7ttKWZF6zuVjtlMO4PXB8stUv3KQMb5CYsi5Of\nxRjmSHnvZ4q6kGTj8JFJwlujp/eDsX0S+Tx9FuaYeYugyxFXc16iqDDsnBdqHSSv\nAXIR1wYQKb6aRPnaGeAIK41JAGTx34m7W0BEkKZ2/wKBgQDrbN5jqws1xILrD1QM\nYPSF9r8UBC1PolfIyodgaV2rfuv+2EuLwoCVHWCMJRJfoVOdc5d1tg2IKPFXt+o9\nOxR6ipUm85D6QDumxRP5u+tBioDlhqrPzwjZcXRDdYcOqWd6N11PGSuPlrzgiPN+\nx6s6OJHQakRzqTtzTKqGynCiMwKBgQDM1iJb9rjAPQZte8yXGV0+JumHhURrD7QK\nZIHvtx83+rRdhvprpSBt68vcs9iKZx5HkGYakASxIvAD+jWXaMv7//N1Zm4jV9e9\n1yDTwfUsj9UwldR7PCc/QtfmPm6aulNNNG9uQ975BpcTfh4PSMQugYbwP00i33uu\n57eHVw7QwwKBgQCg4P/EGlGJx6UzXoEwCF1w4mJHGmegYK8ebpA+aSJynERHHaXa\ndusJe07L1lWM9iC+mwwoi2UJ4/iw2eR/PU1MREGSoaUz7gsVdt2kri8g1bYpo3I8\nmh1RAn/RzZGiik9FLGpeMDQdZoPh6JSE0YuIOLokM0pdw4r1yrFJdTOtEwKBgBVe\nfYUkjw+XDjWbxbM5tS2Ht7MopwOYRssSwy9z5jDb2bcsHrHeLyzofYMPzBZcPZ9v\npAc/YQ3tvCZeEvsxtp4ajJaB0hmjz2EBsW4F/QLiGnaQGvOkSd/ipE1j0/wWVhxm\nzP0u3XMTSe2BqbckezryzlX/9Jcfw3JywAXBgk0rAoGASjPzkRjzaQubuQHQD8Do\nm/JEoUICqhFJ00pVHdi4Uguqn7B9xMGeL3WpjTmSn/7En7FMBnqfa1V+dSukOWGt\nsJs6pYzaQ9A/0u64tqHDMbUzhcJA8qaXAFhvG0bi293abQ2rjV69ilKOS96tLJAL\nB216XANhzWcMkvH1V3rr5ZU=\n-----END PRIVATE KEY-----\n",
    }),
  });
}

export const adminDb = admin.firestore();


